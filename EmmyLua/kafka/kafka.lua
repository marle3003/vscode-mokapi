---This module provides some kafka functions
local kafka

---produces a kafka message
---@param broker string brokers address
---@param topic string name of the topic
---@param key any key of the new message. If not specified a random key is generated
---@param message any the message. If not specified a random message is generated
---@param headers? table optional headers
---@param partition? number the partition to write that message. If not specified a random partition is selected
---@param timeout number after timeout is expired the function will abort
function kafka.produce(broker, topic, key, message, headers, partition, timeout) end

return kafka