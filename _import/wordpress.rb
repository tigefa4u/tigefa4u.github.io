require 'rubygems'
require 'sequel'
require 'fileutils'
require 'yaml'

# NOTE: This converter requires Sequel and the MySQL gems.
# The MySQL gem can be difficult to install on OS X. Once you have MySQL
# installed, running the following commands should work:
# $ sudo gem install sequel
# $ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config

module Jekyll
  module WordPress
    def self.process(dbname, user, pass, host = 'localhost', table_prefix = 'wp_')
      db = Sequel.mysql(dbname, :user => user, :password => pass, :host => host, :encoding => 'utf8')

      FileUtils.mkdir_p("_posts")

      # Reads a MySQL database via Sequel and creates a post file for each
      # post in wp_posts that has post_status = 'publish'. This restriction is
      # made because 'draft' posts are not guaranteed to have valid dates.
      query = "SELECT post_title, \
                      post_name, \
                      post_date, \
                      post_content, \
                      post_excerpt, \
                      ID, \
                      guid \
               FROM #{table_prefix}posts \
               WHERE post_status = 'publish' AND \
                     post_type = 'post'"

      db[query].each do |post|
        # Get required fields and construct Jekyll compatible name.
        title = post[:post_title]
        slug = post[:post_name]
        date = post[:post_date]
        content = post[:post_content]
        name = "%02d-%02d-%02d-%s.markdown" % [date.year, date.month, date.day,
                                               slug]

        # Get the relevant fields as a hash, delete empty fields and convert
        # to YAML for the header.
        data = {
           'layout' => 'post',
           'title' => title.to_s,
           'excerpt' => post[:post_excerpt].to_s,
           'wordpress_id' => post[:ID],
           'wordpress_url' => post[:guid],
           'date' => date
         }.delete_if { |k,v| v.nil? || v == '' }.to_yaml

        # Write out the data and content to file
        File.open("_posts/#{name}", "w") do |f|
          f.puts data
          f.puts "---"
          f.puts content
        end
      end
    end
  end
end
