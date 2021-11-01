---This module provides some functions to decode YAML
local yaml

---Renders the given file with the given data
---@param content string the encoded YAML value
---@return table result the decoded YAML value
---@return table error
function yaml.parse(content) end

---Renders the given template with the given data
---@param path string the encoded YAML value
---@return table result the decoded YAML value
---@return table error
function yaml.readFile(path) end

return yaml