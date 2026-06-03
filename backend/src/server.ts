import app from './app';
import { PORT } from './config/consts';

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
