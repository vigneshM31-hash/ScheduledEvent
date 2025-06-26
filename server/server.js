



exports = {
  serverMethod: function (options) {
    renderData( null,{ message: `Take My Treasure If you can!${options.name} `});//
    //  return{ message: `Hello from serverless function!${options.name} `};
  },
  
  onScheduledEventHandler: async function(payload) {
    console.log("🚀 Scheduled function triggered with data:", payload);
    const { ticketId, priority, status} = payload;
    try {
      const response = await $request.invokeTemplate("updateTicket", {
        context: { id: ticketId },
        body: JSON.stringify({ "priority":priority, "status":status })
      });
      console.log(`✅ Ticket ${ticketId} updated successfully`, response)   ;
    } catch (e) {
      console.error("❌ Ticket update failed:", e.message || e.response || e);
    }
    try{
        const noteResponse=await $request.invokeTemplate("addNote", {
          context: { id: ticketId },
          body: JSON.stringify({ body: notes, private: false })
        });
  
        console.log(`✅ Ticket note ${ticketId} updated by schedule`,noteResponse);
      } catch (e) {
        console.error("❌ Adding note failed:", e.message|| e.response || e);
      }
  },
 
  scheduleTicketUpdate: async function (payload) {
    try {
          console.log("📥 Received scheduleTicketUpdate args:", payload);
    
          const { ticketId, priority, status, notes, scheduleTime } = payload.parameters;
    
          if (!ticketId || !priority || !status || !scheduleTime) {
            console.error("⚠️ Missing required data");
            throw new Error("Missing required fields");
          }
          const time=new Date(scheduleTime);
          const scheduleName = "updateTicket"; 
          console.log("🕑 Scheduling with name:", scheduleName, "at:", time);
    
          await $schedule.create({
            name:time,
            data: { 
              ticket_id: ticketId,
               priority: priority, 
               status: status, 
               notes: notes
               },
          schedule_at: time

          });
    
          console.log(`✅ Scheduled update for ticket ${ticketId} at ${scheduleTime}`);
        } catch (e) {
          console.error("❌ scheduleTicketUpdate failed:", {
            message: e.message,
            stack: e.stack
          });
          throw e;
        }
    console.log("🚀 Scheduled function triggered with data:", payload.parameters);
    const { ticketId, priority, status, notes } = payload.parameters;
    console.log(priority, status, notes,ticketId);

    console.log(`🚀 Updating ticket ${ticketId} with priority=${priority}, status=${status}, notes=${notes}`);
    try {
      const response = await $request.invokeTemplate("updateTicket", {
        context: { id: ticketId },
        body: JSON.stringify({ priority, status })
      });
      console.log(`✅ Ticket ${ticketId} updated successfully`, response);
    } catch (e) {
      console.error("❌ Ticket update failed:", e.message || e.response || e);
    }  


  }
}