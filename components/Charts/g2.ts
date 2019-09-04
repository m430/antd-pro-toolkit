// 全局 G2 设置
import bizcharts, { G2 } from 'bizcharts';

G2.track(false);

const config = {
  defaultColor: '#1089ff',
  shape: {
    interval: {
      fillOpacity: 1,
    },
  },
};

bizcharts.setTheme(config);
