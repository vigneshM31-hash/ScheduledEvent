
exports = {
  scheduleTicketUpdate: async function (payload) {
    try {
          console.log("Received scheduleTicketUpdate args:", payload);
    
          const { ticketId, priority, status, notes, scheduleTime } = payload.parameters;
    
          if (!ticketId || !priority || !status || !scheduleTime) {
            console.error("⚠️ Missing required data");
            throw new Error("Missing required fields");
          }
          const time=new Date(scheduleTime);
          const scheduleName = "updateTicket"; 
          console.log("Scheduling with name:", scheduleName, "at:", time);
          let a=Math.random();
          await $schedule.create({
            name: `${a}`,
            data: {
              ticket_id: ticketId,
               priority: priority, 
               status: status, 
               notes: notes
               },
          schedule_at: time

          });
    
          console.log(`Scheduled update for ticket ${ticketId} at ${scheduleTime}`);
        } catch (e) {
          console.error("scheduleTicketUpdate failed:", {
            message: e.message
          });
          throw e;
        }
    console.log("Scheduled function triggered with data:", payload.parameters);
    const { ticketId, priority, status, notes } = payload.parameters;
    console.log(priority, status, notes,ticketId);
  },

  onScheduledEventHandler: async function(payload) {
    console.log("Scheduled function triggered with data:", payload);
    const { ticketId, priority, status,notes} = payload;
    try {
      const response = await $request.invokeTemplate("updateTicket", {
        context: { id: ticketId },
        body: JSON.stringify({ "priority":priority, "status":status })
      });
      console.log(`Ticket ${ticketId} updated successfully`, response)   ;
    } catch (e) {
      console.error("Ticket update failed:", e.message || e.response || e);
    }
   try{
      const noteResponse=await $request.invokeTemplate("createNotes", {
        context: { id: ticketId },
        body: JSON.stringify({ body: notes, private: false })
      });

      console.log(` Ticket note ${ticketId} updated by schedule`,noteResponse);
    } catch (e) {
      console.error(" Adding note failed:", e.message|| e.response || e);
    }
  }
 
  
}