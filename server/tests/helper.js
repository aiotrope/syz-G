/* eslint-disable quotes */
import User from '../dist/models/user'

const savedUsers = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const testPosts = [
  {
    title:
      'Try to reflog the UX algorithm, maybe it will integrate the brownfield callback!',
    tags: 'js',
    description:
      'Tabs vs spaces test double mechanical keyboard compiler module views Babel. Hashtable reflog environment package manager streams webpack tabs vs spaces. Imagemagick parameter free as in beer interface time-to-interactive hashtable gzip contribution team-player.',
    entry: "console.log('Hello, World!')",
  },
  {
    title:
      'The CLI design is down, mutate the protected array so we can inject the LGTM flexbox!',
    tags: 'java',
    description:
      'Tabs vs spaces test double mechanical keyboard compiler module views Babel. Hashtable reflog environment package manager streams webpack tabs vs spaces. Imagemagick parameter free as in beer interface time-to-interactive hashtable gzip contribution team-player.',
    entry: "console.log('Hello, World!')",
  },
  {
    title: 'We need to mock the reactive HTTP container!',
    tags: 'haskell',
    description:
      'Tabs vs spaces test double mechanical keyboard compiler module views Babel. Hashtable reflog environment package manager streams webpack tabs vs spaces. Imagemagick parameter free as in beer interface time-to-interactive hashtable gzip contribution team-player.',
    entry: "console.log('Hello, World!')",
  },
  {
    title:
      'Use the protected JVM internet button, then you can compress the incognito browser!',
    tags: 'python',
    description:
      'Neck beard pairing Linux Dijkstra spy cache duck typing. Antipattern architecture neck beard naming things branch freelancer security serverless.',
    entry: "print('Hello, World!')",
  },
  {
    title: 'We need to optimize the concurrent big O developer!',
    tags: 'js',
    description:
      'Microservices TOML test-driven website senior-engineer parameter Babel state hardcoded reactive. Mock domain Babel REST interface scale observer pattern DSL engineer. I engineer presenter microservices pair programming state package manager bike-shedding.',
    entry: "console.log('Do some modification!')",
  },
  {
    title:
      'If we compose the developer avocado, we can get to the DSL antipattern through the bitwise UX singleton!',
    tags: 'js',
    description:
      'OTP dynamic programming engineer UX document object model brownfield gzip Kubernetes RPC.',
    entry: "console.log('Do some modification again!')",
  },
]

const sampleComment =
  'Child domain specific language data store public frontend REST bitcoin git. View-model asynchronous DOM SOAP elixir +1 ping. Views CS degree Chrome API lazy load markup behavior-driven whiteboard. IoT backend bootcamp JavaScript duck typing module middleware promise JQuery. Environment compile keycaps meta-programming .NET dependency injection data store atomic design.'

const helper = {
  savedUsers,
  testPosts,
  sampleComment,
}

export default helper
