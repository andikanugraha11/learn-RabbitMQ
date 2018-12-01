
const amqp = require('amqplib/callback_api')    // import library amqplib

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'task_queue'    // Nama antrian adalah 'task_queue'
    const msg = process.argv.slice(2).join(' ') || 'Hello World!'

    ch.assertQueue(q, { durable: true })    // Membuat antrian 'task_queue'
    ch.sendToQueue(q, new Buffer(msg), { persistent: true })    // Mengirim pesan tugas ke antrian
    console.log(`[x] Sent '%s'`, msg)
  })
  setTimeout(() => {
    conn.close()
    process.exit(0)
  }, 500)
})