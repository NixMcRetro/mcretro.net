require "tmpdir"
require "fileutils"
module Liquid
  class Template
    def self.register_filter(_filter); end
  end
end
module Jekyll
  module Hooks
    @callbacks = Hash.new { |h,k| h[k] = [] }
    def self.register(scope, action, &block)
      @callbacks[[scope,action]] << block
    end
    def self.run(scope, action, object)
      @callbacks[[scope,action]].each { |callback| callback.call(object) }
    end
  end
end
require_relative "../_plugins/image_dimensions"
Dir.mktmpdir do |dir|
  files = File.join(dir, "assets", "images")
  FileUtils.mkdir_p(files)
  File.binwrite(File.join(files,"test.png"), "\x89PNG\r\n\x1a\n".b + [13].pack("N") + "IHDR" + [8,6].pack("NN") + "\x08\x02\x00\x00\x00")
  File.binwrite(File.join(files,"test.jpg"), "\xFF\xD8\xFF\xE0\x00\x04XX\xFF\xC0\x00\x11\x08\x01\xE0\x02\x80".b + "0" * 10)
  File.binwrite(File.join(files,"test.gif"), "GIF89a\x01\x00\x01\x00")
  check = lambda { |ok, msg| raise msg unless ok }
  check.call(McRetroImageDimensions.read(dir,"/assets/images/test.jpg") == {"width"=>640,"height"=>480},"JPEG")
  check.call(McRetroImageDimensions.read(dir,"/assets/images/test.png") == {"width"=>8,"height"=>6},"PNG")
  check.call(McRetroImageDimensions.read(dir,"/assets/images/test.gif").nil?,"GIF not touched")
  check.call(McRetroImageDimensions.read(dir,"/assets/images/../file.jpg").nil?,"Traversal refused")
  check.call(McRetroImageDimensions.read(dir,"https://example.com/test.jpg").nil?,"External image refused")
  site = Struct.new(:source).new(dir)
  post = Struct.new(:site,:output).new(site, '<img src="/assets/images/test.jpg" alt="t"><img src="/assets/images/test.png?x=1"><img src="/assets/images/test.gif"><img src="https://example.com/test.jpg"><img src="/assets/images/test.jpg" width="100">')
  Jekyll::Hooks.run(:posts,:post_render,post)
  check.call(post.output.include?('alt="t" width="640" height="480"'),"JPEG attrs")
  check.call(post.output.include?('src="/assets/images/test.png?x=1" width="8" height="6"'),"PNG attrs")
  check.call(post.output.include?('<img src="/assets/images/test.gif">'),"GIF markup")
  check.call(post.output.include?('<img src="https://example.com/test.jpg">'),"External markup")
  check.call(post.output.include?('<img src="/assets/images/test.jpg" width="100">'),"Manual attrs")
  videos = Struct.new(:site,:output).new(site, '<iframe src="https://www.youtube.com/embed/first" loading="lazy"></iframe><iframe src="https://www.youtube.com/embed/second" loading="lazy"></iframe>')
  Jekyll::Hooks.run(:posts,:post_render,videos)
  check.call(videos.output.include?('embed/first" loading="eager"'),"First YouTube eager")
  check.call(videos.output.include?('embed/second" loading="lazy"'),"Second YouTube lazy")
  thumbnails = Struct.new(:output).new('<img class="post-thumbnail-img" loading="lazy"><img class="post-thumbnail-img" loading="lazy">')
  Jekyll::Hooks.run(:pages,:post_render,thumbnails)
  check.call(thumbnails.output.scan('loading="eager"').length == 1, "Exactly one eager thumbnail")
  check.call(thumbnails.output.scan('loading="lazy"').length == 1, "Exactly one lazy thumbnail")
end
puts "Image metadata and lazy-loading tests passed"
