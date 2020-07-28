var line = echarts.init(document.getElementById('line'));
var data = [
  {name: "地区1", data: []},
  {name: "地区2", data: []},
  {name: "地区3", data: []},
  {name: "地区4", data: []},
  {name: "地区5", data: []},
  {name: "地区6", data: []},
  {name: "地区7", data: []},
  {name: "地区8", data: []},
  {name: "地区9", data: []},
  {name: "地区10", data: []},
  {name: "地区11", data: []},
  {name: "地区12", data: []},
  {name: "地区13", data: []}
];
function setMockData(item) {
  var base = +new Date(1968, 9, 3);
  var oneDay = 24 * 3600 * 1000;
  var s, T, b = 0;
  for (var i = 0; i <= 20000; i++) {
    if(!T) {
      T = Math.round(Math.random() * 20 + 5);
      s = Math.random() > 0.5;
    }
    if(b < 20) s = true;
    if(b > 1900) s = false;
    T--;
    var v = Math.round(Math.random() * 20 - 9);
    if(s) b += v;
    else b += v - 2;
    var now = new Date(base += oneDay);
    item.data.push({
      date: [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      value: b
    });
  }
}
data.forEach(i => setMockData(i));

var option = {
  title: {
      text: ''
  },
  tooltip: {},
  legend: {
      data: data.map(i => i.name)
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data[0].data.map(i => i.date)
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 2000
  },
  dataZoom: [{
    type: 'inside',
    start: 99,
    end: 100
  }],
  series: data.map(i => {
    return {
      name: i.name,
      type: 'line',
      symbol: 'none',
      smooth: 1,
      lineStyle: {
        width: 1
      },
      data: i.data.map(d => d.value)
    };
  })
};
line.setOption(option);
var list = data.map(i => ({name: i.name, value: i.data[20000].value})).sort((a, b) => b.value - a.value);
d3.select('.list').selectAll('.item').data(list).enter().append('div').classed('item', true).text(i => i.name).on('click', function(i) {
  d3.select('.list').selectAll('.item').classed('select', false);
  d3.select(this).classed('select', true);
  option.series.forEach(s => {
    if(s.name == i.name) s.lineStyle.width = 2;
    else s.lineStyle.width = 1;
  });
  line.setOption(option);
  console.log(i.name);
});
line.on('datazoom', function(i) {
  var end = i.batch[0].end * 200 >> 0;
  var list = data.map(i => ({name: i.name, value: i.data[end].value})).sort((a, b) => b.value - a.value);
  d3.select('.list').selectAll('.item').data(list).text(i => i.name);
});