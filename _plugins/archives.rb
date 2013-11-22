#
# Generates a single archives.html page in site root that lists all posts by month.
#
# Learned from:
# https://github.com/mojombo/jekyll/wiki/Plugins
# https://gist.github.com/707909
#
#
module Jekyll
  
  class ArchivePage < Page
    def initialize(site, months, posts_by_month)
      @site = site
      @base = site.source
      # I simply write the archives.html file in the _site root
      @dir = "/archives"
      @name = "index.html"
      
      self.process(@name)
      self.read_yaml(File.join(@base, '_layouts'), 'archives.html')
      # array of Times, normalized to year and month
      self.data['months'] = months
      # hash keyed on normalized times, mapped to array of posts
      self.data['posts_by_month'] = posts_by_month
    end
  end
 
 
  class ArchiveGenerator < Generator
    safe true
 
    def group_by_month(posts)
      months = []
      posts_by_month = {}
      posts.reverse.each do |post|
        key = Time.utc(post.date.year, post.date.month)
        if posts_by_month.has_key?(key)
          posts_by_month[key] << post
        else
          posts_by_month[key] = [post]
          months << key
        end
      end
      return [months,posts_by_month]
    end
 
    def generate(site)
      archive_data = group_by_month(site.posts)
      months = archive_data[0]
      posts_by_month = archive_data[1]
 
      archives = ArchivePage.new(site, months, posts_by_month)
      archives.render(site.layouts, site.site_payload)
      archives.write(site.dest)
      site.pages << archives
    end
  end
 
end