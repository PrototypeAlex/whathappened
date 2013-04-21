require 'nokogiri'
require 'open-uri'
require 'json'

url = "http://www.ufocusnz.org.nz/content/New-Zealand-UFO-Sightings-2012/133.aspx"

data = Nokogiri::HTML(open(url))

# Here is where we use the new method to create an object that holds all the
# concert listings.  Think of it as an array that we can loop through.  It's
# not an array, but it does respond very similarly.
sightings = data.css('#ctl00_ctl00_ContentPlaceHolder1_MainContent_uxContent_lblHtml table')
json_return = []
sightings.each do |sighting|
  rows = sighting.css('tr')

  date = rows[0].css('td:last').text.sub(/,/, '')
  date = date.sub(/th/, '')
  unless date =~ /2012/
   date = date.sub(/.$/, "2012")
  else
    date = date.sub(/..$/, "")
  end
  begin
    #date = date.sub(/^\w*./, "")
    date = Date.strptime(date, '%A %e %B %Y')
  rescue 
    if /21/.match(date)
      date = Date.new(2012, 4, 21)
    else
      date = Date.new(2012, 4, 20)
    end
  end

  hash = {}
  hash[:time] = date.to_time.to_i
  hash[:location] = rows[2].css('td:last').text
  hash[:event] = rows[3].css('td:last').text
  description = rows[5].css('td').collect{|td| td.text }.join('')
  description = description.gsub(/\r\n\s*/, '')
  description = description.gsub(/"/, "'")
  hash[:description] = description

  json_return.push(hash)
  #puts rows[2].css('td:last').text
  #puts rows[3].css('td:last').text
end

puts json_return.map{|a| a[:time] }
