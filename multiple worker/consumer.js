const amqp = require('amqplib/callback_api') // Import library amqplib

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'task_queue'    // Nama antrian adalah 'task_queue'

    ch.assertQueue(q, { durable: true })    // Menyatakan antriannya adalah 'task_queue'
    ch.prefetch(1)
    console.log(`[*] Waiting for messages in %s. To exit press CTRL+C`, q)
    /* Menangkap pesan yang dikirimkan RabbitMQ dari antrian */
    ch.consume(q, msg => {
      const secs = msg.content.toString().split('.').length - 1

      console.log(`[x] Received %s`, msg.content.toString())
      setTimeout(() => {
        console.log(`[x] Done`)
        ch.ack(msg)
      }, secs * 1000)
    }, { noAck: false })
  })
})