module.exports = {
  apps: [{
    name: 'feed-generator',
    script: 'yarn',
    args: 'start',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    cwd: '/srv/feed-generator'
  }]
}
