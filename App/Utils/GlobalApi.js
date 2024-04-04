import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/clt9zd4g8289107uz8i7cdir8/master";

const getSlider = async () => {
  const query = gql`
    query MyQuery {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getCategory = async () => {
  const query = gql`
    query getCategory {
      categories {
        id
        name
        icons {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessList = async () => {
  const query = gql`
    query getBusinessList {
      bussinessLists {
        id
        name
        email
        contactPerson
        category {
          name
        }
        address
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessListByCategory = async (category) => {
  const query =
    gql`
    query getBusninessList {
      bussinessLists(where: { category: { name: "` +
    category +
    `" } }) {
        id
        name
        email
        contactPerson
        category {
          name
        }
        address
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const createBooking = async (data) => {
  const mutationQuery =
    gql`
    mutation createBooking {
      createBooking(
        data: {
          bookingStatus: Booked,
          bussinessList: { connect: { id: "` +
    data.businessId +
    `" } },
    userName: "` +
    data.userName +
    `",
       
    userEmail: "` +
    data.userEmail +
    `",
       date: "` +
    data.date +
    `",
          time: "` +
    data.time +
    `",
     
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
        count
    }
  }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const getUserBooking = async (userEmail) => {
  const query =
    gql`
    query GetUserBookings {
      bookings(orderBy: updatedAt_DESC, where: { userEmail: "` +
    userEmail +
    `" }) {
        time
        date
        userEmail
        userName
        bookingStatus
        id
        bussinessList {
          id
          images {
            url
          }
          name
          email
          address
          contactPerson
          about
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getSlider,
  getCategory,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBooking,
};
