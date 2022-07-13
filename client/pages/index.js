
import Link from "next/link";
import buildClient from "../api/build-client";



const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
      return (
        <tr key={ticket.id}>
          <td>{ticket.title} </td>
          <td>${ticket.price} </td>
          <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
          </td>
        </tr>
      );
    });


    return (
      
        <div>
          <h1>Tickets</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>{ticketList}</tbody>
          </table>
        </div>
      
    );
  };
  


  export const getServerSideProps = async (context) => {
    const client = buildClient(context);
    let currentUser, tickets;
    try {
      const currentUserRes = await client.get("/api/users/currentuser");
      currentUser = currentUserRes.data;
      console.log("currentUser in client index.js", currentUser);
      const ticketsRes = await client.get("/api/tickets");
      tickets = ticketsRes.data;
      console.log("tickets in index.js client", tickets);
    } catch (e) {
      console.log("error in client index server", e);
    }
    // because undefined cannot be serialized
    if (!currentUser) {
      currentUser = null;
    }
    if (!tickets) {
      tickets = null;
    }
    return { props: { currentUser, tickets } };
  };

export default LandingPage;