# Standard-library-only tests; must work under Bundler without extra gems.
module Liquid
  class Template
    def self.register_filter(_filter); end
  end
end
require_relative '../../_plugins/without_media_captions'

class CaptionPreviewChecks
  include McRetroCaptionPreviews

  def initialize
    @checks = 0
  end

  def check(condition, description)
    raise "Caption preview regression failed: #{description}" unless condition
    @checks += 1
  end

  def run
    html = '<p><img src="a.jxl" alt="A complete description"></p><p class="media-caption"><em>Image caption.</em></p><p>Real article text.</p>'
    result = without_media_captions(html)
    check(result.include?('alt="A complete description"'), 'rendered alt text preserved')
    check(result.include?('Real article text.'), 'real article text preserved')
    check(!result.include?('Image caption.'), 'rendered caption excluded')

    result = without_media_captions("<p class='other media-caption caption'><a href='foo'>Photo caption.</a></p><p>Body.</p>")
    check(result == '<p>Body.</p>', 'multi-class and single-quote captions excluded')

    result = without_media_captions('<figure><img alt="A bird"><figcaption><em>Bird caption.</em></figcaption></figure><p>Bird story.</p>')
    check(result.include?('<img alt="A bird">'), 'figcaption image preserved')
    check(result.include?('Bird story.'), 'figcaption following paragraph preserved')
    check(!result.include?('Bird caption.'), 'figcaption text excluded')

    raw = "![Alt description](a.jxl)\n\n*First caption.*\n{: .media-caption }\n\nReal intro.\n\n*Not a caption.*\n\n![More alt](b.jpg)\n\n*Second caption.*\n{: .media-caption }\n\nThe ending."
    result = without_media_captions(raw)
    check(result.include?('Real intro.'), 'raw markdown body preserved')
    check(result.include?('*Not a caption.*'), 'ordinary emphasis preserved')
    check(!result.include?('Alt description'), 'raw image alt removed from excerpt')
    check(result.include?('The ending.'), 'raw markdown ending preserved')
    check(!result.include?('First caption.') && !result.include?('Second caption.'), 'multiple raw captions removed')

    result = without_media_captions("![A detailed description][photo]\n\nArticle text.")
    check(!result.include?('A detailed description'), 'reference-style image alt excluded')
    check(result.include?('Article text.'), 'reference-style body preserved')

    prose = '<p><em>Emphasis is part of the article.</em></p>'
    check(without_media_captions(prose) == prose, 'regular italic paragraph untouched')
    check(without_media_captions(nil) == '', 'nil input safe')
    # The original Famicom guide placed legacy captions on image lines.
    # Kramdown's IAL must be a standalone line, never followed by old text.
    famicom = File.read(File.expand_path('../../_posts/2012-05-26-nintendo-famicom-composite-av-mod.md', __dir__))
    bad = famicom.lines.each_with_index.filter_map do |line, i|
      i + 1 if line.match?(/^\{:\s*\.media-caption\s*\}[ \t]+\S/)
    end
    check(bad.empty?, "Famicom captions have no trailing text after IAL (lines: #{bad.join(', ')})")
    check(famicom.scan(/^\{:\s*\.media-caption\s*\}[ \t]*$/).length == 35,
          'all 35 Famicom captions use standalone IAL markers')
    puts "Caption preview filter passed #{@checks} checks."
  end
end

CaptionPreviewChecks.new.run
