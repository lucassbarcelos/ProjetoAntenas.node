const {
  NODE_ENV,
  MONGODB_USER,
  MONGODB_PASS,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_NAME,
  MONGODB_URL,
} = process.env;

const parsedUser = encodeURIComponent(MONGODB_USER);
const parsedPassword = encodeURIComponent(MONGODB_PASS);
const parsedName = encodeURIComponent(MONGODB_NAME);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const prodUri =
  "mongodb+srv://antenas:fatec@clusterantenas.sd3th.gcp.mongodb.net/antenas?retryWrites=true&w=majority";

const devUri = `mongodb://${parsedUser}:${parsedPassword}@${MONGODB_HOST}:${MONGODB_PORT}/${parsedName}?authSource=admin`;

const connection = {
  uri: NODE_ENV === "production" ? prodUri : devUri,
  options,
};

module.exports = connection;
