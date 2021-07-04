import Friends from '../../components/Friends/Friends';

const DUMMY_DATA = [
  {
    firstName: "David",
    lastName: "Meuschke",
    uid: "1H6NmAURoIObziexAYUXaWiBYFo1",
    userName: "Papa Bear",
  },
  {
    firstName: "Derek",
    lastName: "Smith",
    uid: "1H6NmAURoIObziexAYU31XaWiBYFo1",
    userName: "Daddy",
  },
  {
    firstName: "Daniel",
    lastName: "Luo",
    uid: "1H6NmAURo1frbziexAYU31XaWiBYFo1",
    userName: "Bolderkat",
  },
];

const DUMMY_SEARCH = ['Daniel', 'David', 'Caleb', 'Tory', 'Darnell', 'Damian', 'Derek', 'Darren']

const friendsPage = () => {
  return (

    <Friends
        friendList={DUMMY_DATA}
        friendSearch={DUMMY_SEARCH}
    />

  );
};

export default friendsPage;
