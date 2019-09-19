const assets = [
  require('../../assets/images/ag.png'),
  require('../../assets/images/bc.png'),
  require('../../assets/images/be.png'),
  require('../../assets/images/dt.png'),
  require('../../assets/images/dw.png'),
  require('../../assets/images/fd.png'),
  require('../../assets/images/hc.png'),
  require('../../assets/images/rm.png'),
  require('../../assets/images/vp.png'),
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default function getRandomAsset() {
  return assets[getRandomInt(0, assets.length)];
}
