---This module is an implementation of the Mustache template language
local mustache

---Renders the given file with the given data
---@param path string path to the file
---@param data table data passed to the template
---@return string result the rendered string
function mustache.render_file(path, data) end

---Renders the given template with the given data
---@param template string the template
---@param data table data passed to the template
---@return string result the rendered string
function mustache.render(template, data) end

return mustache