# frozen_string_literal: true

# Secondary pagination for Channel Chirp without changing Jekyll's main
# /blog/ paginator. Only already-published, non-opted-out conure posts appear.
module Jekyll
  class ChannelChirpAdventuresGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      posts = site.posts.docs.select do |post|
        Array(post.data["categories"]).include?("parrots") &&
          post.data["channel_chirp"] != false
      end.sort_by { |post| [post.date, post.url] }.reverse

      per_page = site.config.fetch("paginate", 5).to_i
      per_page = 5 unless per_page.positive?
      total_pages = [(posts.size.to_f / per_page).ceil, 1].max

      # Preserve the sidebar's year/month navigation when a month falls on
      # another blog-roll page. Store its first page and first post URL.
      month_pages = {}
      month_first_urls = {}
      posts.each_with_index do |post, index|
        month = post.date.strftime("%Y-%m")
        month_pages[month] ||= index / per_page + 1
        month_first_urls[month] ||= post.url
      end
      site.data["chirp_adventures_month_pages"] = month_pages
      site.data["chirp_adventures_month_first_urls"] = month_first_urls

      # Generate month pages from the exact same released-only Bird post set
      # as Adventures; never import the retired Channel Chirp snapshot.
      posts.group_by { |post| post.date.strftime("%Y-%m") }.each do |month, month_posts|
        year, number = month.split("-")
        page = PageWithoutAFile.new(site, site.source,
                                    "chirp/archive/#{year}/#{number}", "index.html")
        page.data["layout"] = "archive"
        page.data["type"] = "month"
        page.data["date"] = month_posts.first.date
        page.data["posts"] = month_posts
        page.data["permalink"] = "/chirp/archive/#{year}/#{number}/"
        page.data["channel_chirp"] = true
        page.data["pagefind"] = false
        page.content = ""
        site.pages << page
      end

      index = site.pages.find do |page|
        page.data["permalink"] == "/chirp/adventures/" ||
          page.url == "/chirp/adventures/"
      end
      raise "Missing Channel Chirp Adventures index" unless index

      set_pagination(index, posts, 1, total_pages, per_page)
      (2..total_pages).each do |number|
        page = PageWithoutAFile.new(site, site.source,
                                    "chirp/adventures/page#{number}", "index.html")
        page.data["layout"] = "default"
        page.data["title"] = "Channel Chirp Adventures"
        page.data["permalink"] = "/chirp/adventures/page#{number}/"
        page.data["channel_chirp"] = true
        page.data["pagefind"] = false
        page.content = "{% include channel-chirp-blog-roll.html %}"
        set_pagination(page, posts, number, total_pages, per_page)
        site.pages << page
      end
    end

    private

    def set_pagination(page, posts, number, total_pages, per_page)
      page.data["chirp_page_posts"] = posts.slice((number - 1) * per_page, per_page) || []
      page.data["chirp_current_page"] = number
      page.data["chirp_total_pages"] = total_pages
      page.data["chirp_total_posts"] = posts.size
    end
  end
end
