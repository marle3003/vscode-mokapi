---@class workflow
---@see Response
workflow = {}

---@alias event 
---| '"http"' # `request, response`
---@alias eventHandler fun(workflow: workflow, event: string, args: any[])
---@alias timerHandler fun(workflow: workflow)

---creates a new Mokapi workflow
---@param name string
---@return workflow workflow
function workflow.new(name) end

---registers a new event handler
---@param self workflow
---@param event event event name
---@param handler eventHandler 
function workflow.event(self, event, handler) end

---registers a new scheduled handler
---@param self workflow
---@param every string a duration string, a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms", "1.5h", or "2h45m".
---Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h"
---@param handler timerHandler
function workflow.timer(self, every, handler) end



---@class Request
---@field method string
---@field url Url
---@field body table
---@field path table<string, any>
---@field header table<string, any>
Request = {}

---@class Url
---@field scheme string the scheme name for this url
---@field host string the host name. This is usually the DNS host name or IP address of the server.
---@field path string the relative path
---@field query string  the query information
Url = {}

---@class Response
---@field headers table<string, string>
---@field statusCode number
---@field body string the response body
---@field data any if the body field is nil, Mokapi encodes this value according to the OpenAPI specification of the current request.
Response = {}
