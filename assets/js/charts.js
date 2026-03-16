/* SIMPACT B2B — CHARTS.JS v2.1 */
const Charts = {
  instances: {},

  _colors: {
    cyan:    'rgba(0,184,212,1)',
    cyanBg:  'rgba(0,184,212,0.15)',
    magenta: 'rgba(233,30,99,1)',
    magentaBg:'rgba(233,30,99,0.15)',
    success: 'rgba(76,175,80,1)',
    warning: 'rgba(255,152,0,1)',
    info:    'rgba(33,150,243,1)',
    purple:  'rgba(156,39,176,1)',
    gray:    'rgba(158,158,158,1)',
    grayBg:  'rgba(158,158,158,0.1)'
  },

  destroy(id) {
    if (this.instances[id]) { this.instances[id].destroy(); delete this.instances[id]; }
  },

  caLineChart(canvasId, labels, data, data2 = null, objectif = null) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return;
    const datasets = [{
      label: 'CA (TND)',
      data: data,
      borderColor: this._colors.cyan,
      backgroundColor: this._colors.cyanBg,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: this._colors.cyan,
      pointRadius: 4,
      pointHoverRadius: 6
    }];
    if (data2) datasets.push({
      label: 'Mois précédent',
      data: data2,
      borderColor: this._colors.gray,
      backgroundColor: 'transparent',
      borderDash: [5,5],
      tension: 0.4,
      pointRadius: 2
    });
    if (objectif) {
      const obj = new Array(labels.length).fill(objectif);
      datasets.push({
        label: 'Objectif',
        data: obj,
        borderColor: this._colors.magenta,
        backgroundColor: 'transparent',
        borderDash: [8,4],
        pointRadius: 0,
        borderWidth: 1.5
      });
    }
    this.instances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position:'top', labels:{ font:{family:'Outfit',size:11}, padding:16 } } },
        scales: {
          x: { grid:{ color:'rgba(0,0,0,0.04)' }, ticks:{ font:{family:'Space Mono',size:10} } },
          y: { grid:{ color:'rgba(0,0,0,0.04)' }, ticks:{ font:{family:'Space Mono',size:10}, callback: v => v >= 1000 ? (v/1000)+'k' : v } }
        }
      }
    });
  },

  donutChart(canvasId, labels, data, colors = null) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return;
    const defColors = [this._colors.cyan, this._colors.magenta, this._colors.info, this._colors.success, this._colors.warning, this._colors.purple];
    this.instances[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets:[{ data, backgroundColor: colors || defColors.slice(0,data.length), borderWidth:2, borderColor:'white' }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '65%',
        plugins: { legend: { position:'right', labels:{ font:{family:'Outfit',size:11}, padding:12, boxWidth:12, borderRadius:3 } } }
      }
    });
  },

  barChart(canvasId, labels, data, label = '', horizontal = false) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return;
    this.instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets:[{
          label,
          data,
          backgroundColor: data.map((_,i) => i % 2 === 0 ? this._colors.cyanBg : this._colors.magentaBg),
          borderColor:     data.map((_,i) => i % 2 === 0 ? this._colors.cyan : this._colors.magenta),
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        responsive: true, maintainAspectRatio: false,
        plugins: { legend:{ display: !!label, labels:{ font:{family:'Outfit',size:11} } } },
        scales: {
          x: { grid:{ color:'rgba(0,0,0,0.04)' }, ticks:{ font:{family:'Space Mono',size:9} } },
          y: { grid:{ color:'rgba(0,0,0,0.04)' }, ticks:{ font:{family:'Space Mono',size:9} } }
        }
      }
    });
  },

  progressBar(canvasId, valeur, total, color = null) {
    const el = document.getElementById(canvasId);
    if (!el) return;
    const pct = Math.min(100, Math.round(valeur / total * 100));
    el.innerHTML = `
      <div class="flex justify-between mb-2 text-sm">
        <span class="font-semibold">${Utils.tndShort(valeur)}</span>
        <span class="text-muted">${pct}% de ${Utils.tndShort(total)}</span>
      </div>
      <div class="progress progress-lg">
        <div class="progress-bar ${pct > 80 ? 'success' : pct > 50 ? '' : 'warning'}" style="width:${pct}%"></div>
      </div>
    `;
  }
};
window.Charts = Charts;
