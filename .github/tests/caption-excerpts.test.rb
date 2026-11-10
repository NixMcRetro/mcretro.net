require 'minitest/autorun'

# The filter only depends on Liquid's registration API; no Jekyll build required.
module Liquid
  class Template
    def self.register_filter(_filter); end
  end
end
require_relative '../../_plugins/without_media_captions'

class CaptionPreviewTest < Minitest::Test
  include McRetroCaptionPreviews

  def test_rendered_caption_and_alt_remain_independent
    html = '<p><img src="a.jxl" alt="A complete description"></p><p class="media-caption"><em>Image caption.</em></p><p>Real article text.</p>'
    actual = without_media_captions(html)
    assert_includes actual, 'alt="A complete description"'
    assert_includes actual, 'Real article text.'
    refute_includes actual, 'Image caption.'
  end

  def test_multiclass_and_single_quotes
    actual = without_media_captions("<p class='other media-caption caption'><a href='foo'>Photo caption.</a></p><p>Body.</p>")
    assert_equal '<p>Body.</p>', actual
  end

  def test_figcaption_preserves_surrounding_figure
    actual = without_media_captions('<figure><img alt="A bird"><figcaption><em>Bird caption.</em></figcaption></figure><p>Bird story.</p>')
    assert_includes actual, '<img alt="A bird">'
    assert_includes actual, 'Bird story.'
    refute_includes actual, 'Bird caption.'
  end

  def test_multiple_markdown_caption_blocks
    body = "![Alt description](a.jxl)\n\n*First caption.*\n{: .media-caption }\n\nReal intro.\n\n*Not a caption.*\n\n![More alt](b.jpg)\n\n*Second caption.*\n{: .media-caption }\n\nThe ending."
    actual = without_media_captions(body)
    assert_includes actual, 'Real intro.'
    assert_includes actual, '*Not a caption.*'
    refute_includes actual, '![Alt description](a.jxl)'
    assert_includes actual, 'The ending.'
    refute_includes actual, 'First caption.'
    refute_includes actual, 'Second caption.'
  end

  def test_reference_images_with_alt_text_do_not_leak
    actual = without_media_captions("![A detailed description][photo]\n\nArticle text.")
    refute_includes actual, 'A detailed description'
    assert_includes actual, 'Article text.'
  end

  def test_plain_prose_and_nil_are_safe
    assert_equal '<p><em>Emphasis is part of the article.</em></p>', without_media_captions('<p><em>Emphasis is part of the article.</em></p>')
    assert_equal '', without_media_captions(nil)
  end
end
