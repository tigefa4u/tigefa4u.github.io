module ReadTimeFilter

  def readtime(input)

    charcount = 4.5
    wpm = 180

    rt = (input.to_f/charcount/wpm).round
    rt = 1 if rt < 1
    rt

  end

  Liquid::Template.register_filter self

end
