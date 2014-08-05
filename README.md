# Marvel Random

Get random marvel characters. Use it if you want to...

# API

## setApiKey

You must call this first. Simply set it with your public API key obtained from
[developer.marvel.com](http://developer.marvel.com/) and then you can proceed to make api calls.

## getCharacter

This takes a single argument with options (all optional):

- success - function(response, status, request)
- error - function(response, status, request)
- characterOffset - Number - the offset to pass to marvel - defaults to random
- totalCharacters - Number - the number of characters to return - defaults to 1
- id - String - the id of a specific character to retrieve
- apiKey - String - your api key. Overrides what is set in `setApiKey`. Also, makes it unnecessary to call `setApiKey`
altogether.

# Why?

I actually just made this to demonstrate how to use [gh-pages](https://pages.github.com/) to demo libraries and other
things you may need it for. Seemed like a fun little project to wrap the marvel api, so I created this.

# Contributing

I don't actually really care much about this project and would be surprised if anyone ended up using it, but if you want
to, feel free to submit a PR or just fork it...

# License

MIT