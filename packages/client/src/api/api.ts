import ky from 'ky';

const instance = ky.create({
  prefixUrl: 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
