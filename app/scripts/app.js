
let client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', () => scheduleTicketUpdate());
}
 async function scheduleTicketUpdate() {//frontend call
  const data = await client.data.get("ticket");
  console.log(" Ticket data:", data.ticket.id);
  document.getElementById("submitBtn").addEventListener("click", async () => {
    const priority = parseInt(document.getElementById("priority").value);
    const status = parseInt(document.getElementById("status").value);
    const notes = document.getElementById("notes").value;
    const scheduleTime = new Date(document.getElementById("scheduleTime").value);

    const payload = {
      ticketId: data.ticket.id,
      priority,
      status,
      notes,
      scheduleTime: scheduleTime
    };
    console.log(" Scheduling for:", scheduleTime);

    await client.request.invoke("scheduleTicketUpdate", {
      parameters: payload
    });

   console.log(" Ticket update scheduled!");
  });
}










































// async function apiCall() {
//   const container = document.getElementById("apptext");

//   try {
//     const response = await client.request.invokeTemplate("getTickets", {
//       context: {} // send an actual object or remove body if not needed
//     });

//     console.log("Response:", response); // Debug log
//     container.innerHTML = "API call successful!";
//   } catch (error) {
//     console.error("API call failed:", error); // Catch errors
//     container.innerHTML = "API call failed. Check console.";
//   }
// }






























// async function dummy(){
//   const response= await client.request.invoke("jack", {});
//    console.log("Response from server method:", response);
 
//  }
//  async function Testing() {
//    const ticketData = await client.data.get("ticket");
//    const ticketId = ticketData.ticket.id;
 
//    document.getElementById("submitBtn").addEventListener("click", async () => {
//      try {
//        const response = await client.request.invoke("Testing", {
//          parameters: { id: ticketId }
//        });
//        console.log("✅ Scheduled event response:", response);
//      } catch (error) {
//        console.error("❌ Error invoking server method:", error);
//      }
//    });
//  }
 


























// async function renderText(client) {
//   try{
//   await client.request.invoke("serverMethod", { name: "Gold.D.Roger" }
    
//       const container = document.getElementById("apptext");
//       if (container) {
//         container.innerHTML = `
//           <strong>Server Response:</strong><br>
//           <pre>${JSON.stringify(data.response, null, 2)}</pre> `;
//       }
//       console.log("Server method response is:", data.response);
//     },
//     catch(err) {
//       console.error("Error invoking serverMethod:", err.message);
//     }
  
// }
// async function renderText() {


// let a={name: "Gold.D.Roger"};
// try {
//   let data = await client.interface.trigger("showNotify", {
//     type: "info",
//     title: "Notice!!",
//     message: serverMethod(a)
//     /* The "message" should be plain text */
//   });
//     console.log(data); // success message
// } catch (error) {
//     // failure operation
//     console.error(error);
// }


// }


  

