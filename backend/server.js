const app = require('./src/app');

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}/graphql`);
});
