import app from './index';

const port = 8001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`application is running on the port ${port}`);
});
