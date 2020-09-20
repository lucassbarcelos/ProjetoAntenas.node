
const { MONGODB_USER, MONGODB_PASS, MONGODB_HOST, MONGODB_PORT, MONGODB_NAME } = process.env;

const parsedUser = encodeURIComponent(MONGODB_USER);
const parsedPassword = encodeURIComponent(MONGODB_PASS);

module.exports = {
  uri: `mongodb+srv://antenas:fatec@clusterantenas.sd3th.gcp.mongodb.net/antenas?retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
}
