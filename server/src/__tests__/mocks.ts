export default {
  codeToExecuteData: {
    language_id: "63",
    source_code: "function test() { console.log('Test number one') }; test();",
    stdin: ""
  },
  badCodeToExecuteData: {
    source_code: "function test() { console.log('This output should not exist') }; test();",
    stdin: ""
  }
}