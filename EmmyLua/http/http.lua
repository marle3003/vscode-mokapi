---This module provides a HTTP client implementation.
http = {}

---@class HttpResponse
---@field body string
---@field statusCode number
response = {}

---Issues a GET to the specified URL
---@param url string the URL
---@return HttpResponse response the response of that GET request
---@return string error
function http.get(url) end

---Issues a POST to the specified URL
---@param url string the URL
---@param body string the body content
---@param contentType? string the content type of the body. The default is *text/plain*
---@return HttpResponse response the response of that GET request
---@return string error
function http.post(url, body, contentType) end

return http