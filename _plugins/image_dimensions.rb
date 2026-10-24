# Read intrinsic pixel dimensions from local JPEG/PNG files during the Jekyll build.
# Image bytes are never changed, and no extra image variants are generated.
module McRetroImageDimensions
  ROOT_PREFIX = "/assets/images/".freeze
  JPEG_SOF = [0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF].freeze
  @cache = {}

  def self.read(source, url)
    return nil unless url.is_a?(String) && url.start_with?(ROOT_PREFIX)

    path = url.split(/[?#]/, 2).first
    return nil unless path.match?(/\A\/assets\/images\/[a-zA-Z0-9_\/. -]+\z/)
    return nil if path.split("/").include?("..")
    return nil unless path.match?(/\.(?:jpe?g|png)\z/i)

    root = File.expand_path("assets/images", source)
    file = File.expand_path("." + path, source)
    return nil unless file.start_with?(root + File::SEPARATOR) && File.file?(file)

    @cache.fetch(file) do
      @cache[file] = dimensions(file)
    end
  end

  def self.dimensions(file)
    File.open(file, "rb") do |io|
      if file.match?(/\.png\z/i)
        header = io.read(24)
        return nil unless header && header.bytesize == 24
        return nil unless header.start_with?("\x89PNG\r\n\x1A\n".b) && header[12, 4] == "IHDR"
        width, height = header[16, 8].unpack("NN")
        return valid_dimensions(width, height)
      end

      return nil unless io.read(2) == "\xFF\xD8".b
      loop do
        prefix = io.read(1)
        return nil unless prefix
        next unless prefix.getbyte(0) == 0xFF

        marker = io.read(1)
        return nil unless marker
        marker = marker.getbyte(0)
        while marker == 0xFF
          marker_byte = io.read(1)
          return nil unless marker_byte
          marker = marker_byte.getbyte(0)
        end
        return nil if marker == 0xDA || marker == 0xD9
        next if marker == 0xD8 || marker == 0x01 || (0xD0..0xD7).cover?(marker)

        len_bytes = io.read(2)
        return nil unless len_bytes && len_bytes.bytesize == 2
        length = len_bytes.unpack1("n")
        return nil if length < 2

        if JPEG_SOF.include?(marker)
          data = io.read(5)
          return nil unless data && data.bytesize == 5
          height, width = data[1, 4].unpack("nn")
          return valid_dimensions(width, height)
        end
        io.seek(length - 2, IO::SEEK_CUR)
      end
    end
  rescue IOError, SystemCallError
    nil
  end

  def self.valid_dimensions(width, height)
    return nil unless width.between?(1, 100_000) && height.between?(1, 100_000)
    { "width" => width, "height" => height }
  end

  module Filter
    def local_image_dimensions(url)
      site = @context.registers[:site]
      return nil unless site
      McRetroImageDimensions.read(site.source, url)
    end
  end
end

Liquid::Template.register_filter(McRetroImageDimensions::Filter)

# Jekyll-rendered Markdown images: add correct intrinsic dimensions, but do not
# touch any GIF, external resource, manually dimensioned image, or source file.
Jekyll::Hooks.register :posts, :post_render do |post|
  next unless post.output.is_a?(String)
  post.output = post.output.gsub(/<img\b[^>]*>/i) do |tag|
    next tag if tag.match?(/\s(?:width|height)\s*=/i)
    src = tag.match(/\ssrc\s*=\s*(["'])(.*?)\1/i)
    next tag unless src
    dimensions = McRetroImageDimensions.read(post.site.source, src[2])
    next tag unless dimensions
    tag.sub(/(\s*\/?>)\z/) do |ending|
      %Q{ width="#{dimensions['width']}" height="#{dimensions['height']}"} + ending
    end
  end
end

# The first YouTube player in each article should be ready immediately, while
# subsequent players can wait. Per-page rendered HTML avoids Liquid counter scope.
Jekyll::Hooks.register :posts, :post_render do |post|
  next unless post.output.is_a?(String)
  first_player = true
  post.output = post.output.gsub(/<iframe\b[^>]*>/i) do |tag|
    next tag unless tag.include?("youtube.com/embed/")
    loading = first_player ? "eager" : "lazy"
    first_player = false
    if tag.match?(/\sloading\s*=/i)
      tag.sub(/\sloading\s*=\s*(["'])[^"']*\1/i, %( loading="#{loading}"))
    else
      tag.sub(/>\z/, %( loading="#{loading}">))
    end
  end
end

# The first *actual* thumbnail on each blog page should be eager, even if the
# preceding post has no thumbnail at all. No image source URL is changed.
Jekyll::Hooks.register :pages, :post_render do |page|
  next unless page.output.is_a?(String) && page.output.include?('class="post-thumbnail-img"')
  first_thumbnail = true
  page.output = page.output.gsub(/<img\b[^>]*>/i) do |tag|
    next tag unless tag.include?('class="post-thumbnail-img"')
    next tag unless first_thumbnail
    first_thumbnail = false
    tag.sub('loading="lazy"', 'loading="eager"')
  end
end
