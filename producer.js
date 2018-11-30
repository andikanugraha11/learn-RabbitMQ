const amqp =  require('amqplib');

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel()
            .then(ch =>{
                const q = 'hello' //queue name is 'hello'
                const msg = 'Hello World' // the message send to RabbitMQ

                const ok = ch.assertExchange(q, {durable: false}) //create queue

                return ok.then(()=>{
                    ch.sendToQueue(q,Buffer.from(msg)) // sending message to RabbitMQ
                    console.log('- Send',msg)
                    return ch.close()
                })
            }).finally(()=> conn.close())
    }).catch(console.warn)