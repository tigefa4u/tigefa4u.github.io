require 'pathname'

module Jekyll
    module Filters
        def smilify(text)
            sitecontext = @context.registers[:site];

            theme = sitecontext.config['smileytheme']
            mappath = (Pathname.new(sitecontext.source) + "_includes/smileys").expand_path

            unless theme == false
                imgmap = YAML.load_file("#{mappath}/default.yml");
                if File.exists?("#{mappath}/#{theme}.yml")
                    newmap = YAML.load_file("#{mappath}/#{theme}.yml")
                    imgmap = imgmap.merge(newmap)
                end

                ext = (imgmap.shift)[1]
                imgmap.each do |smiley, regex|
                    if File.exists?((Pathname.new(sitecontext.source) + "images/smileys/#{theme}/#{smiley}.#{ext}").expand_path)
                        if regex == "" then regex = "n^" end
                        text.gsub!(Regexp.new("(^|\\s|<(?!(?:!nosmiley|pre|code)).*?>)(?:#{regex}|(?:\\{:#{smiley}:\\}))(?=\\W?(?:\\s|<[^!].*?>|$))", "i"), "\\1<img src='#{sitecontext.config['root']}images/smileys/#{theme}/#{smiley}.#{ext}' alt='[#{smiley}]' class='smiley'/>")
                    end
                end
                imgmap.each do |smiley, regex|
                    if regex == "" then regex = "n^" end
                    text.gsub!(Regexp.new("(^|\\s|<(?!(?:!nosmiley|pre|code)).*?>)(=*)=(#{regex}|(?:\\{:#{smiley}:\\}))=(?=\\2\\W?(?:\\s|<[^!].*?>|$))", "i"), "\\1<!nosmiley-->\\2\\3<!-->")
                end
            end

            text
        end
    end
end
