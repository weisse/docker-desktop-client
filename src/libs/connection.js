import Docker from 'dockerode'
const connection = new Docker({socketPath: '/var/run/docker.sock'});
export default connection