/**错误处理是用于需要自己根据状态码判定是否返回错误信息
 */
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
