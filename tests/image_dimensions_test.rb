require "tmpdir"
require "fileutils"
module Liquid
  class Template
    def self.register_filter(_filter); end
  end
end
module Jekyll
  module Hooks
    def self.register(_scope, _action, &block)
      @callback = block
    end
    def self.callback = @callback
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
  Jekyll::Hooks.callback.call(post)
  check.call(post.output.include?('alt="t" width="640" height="480"'),"JPEG attrs")
  check.call(post.output.include?('src="/assets/images/test.png?x=1" width="8" height="6"'),"PNG attrs")
  check.call(post.output.include?('<img src="/assets/images/test.gif">'),"GIF markup")
  check.call(post.output.include?('<img src="https://example.com/test.jpg">'),"External markup")
  check.call(post.output.include?('<img src="/assets/images/test.jpg" width="100">'),"Manual attrs")
end
puts "Image metadata tests passed"
