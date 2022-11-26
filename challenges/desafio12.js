db.trips.aggregate([
  {
    $project: {
      dayOfWeek: { $dayOfWeek: "$startTime" },
      startStationName: 1,
    },
  },
  {
    $group: {
      _id: {
        dayOfWeek: "$dayOfWeek",
        startStationName: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$total",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
