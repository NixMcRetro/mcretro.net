# Only remove caption text from generated previews; never alter article HTML.
module McRetroCaptionPreviews
  CAPTION_CLASS_ELEMENT = %r{<(p|div|span|small)\b(?=[^>]*\bclass\s*=\s*(?:"[^"]*\bmedia-caption\b[^"]*"|'[^']*\bmedia-caption\b[^']*'))[^>]*>.*?</\1\s*>}im.freeze
  FIGCAPTION_ELEMENT = %r{<figcaption\b[^>]*>.*?</figcaption\s*>}im.freeze
  MARKDOWN_IMAGE = /!\[[^\]\r\n]*\]\((?:[^()\r\n]|\([^()\r\n]*\))*\)/.freeze
  MARKDOWN_REFERENCE_IMAGE = /!\[[^\]\r\n]*\]\[[^\]\r\n]*\]/.freeze
  MARKDOWN_CAPTION_IAL = /\{:\s*[^}\r\n]*\.media-caption\b[^}\r\n]*\}\s*\z/.freeze

  def without_media_captions(content)
    return '' if content.nil?

    # Liquid receives rendered HTML in some contexts and raw Markdown in others.
    # Match both forms, leaving image alt attributes and full article markup alone.
    html = content.to_s.gsub(CAPTION_CLASS_ELEMENT, '').gsub(FIGCAPTION_ELEMENT, '')
    html.gsub(MARKDOWN_IMAGE, '').gsub(MARKDOWN_REFERENCE_IMAGE, '')
        .split(/\r?\n[ \t]*\r?\n/, -1)
        .reject { |paragraph| paragraph.match?(MARKDOWN_CAPTION_IAL) }
        .join("\n\n")
  end
end

Liquid::Template.register_filter(McRetroCaptionPreviews)
