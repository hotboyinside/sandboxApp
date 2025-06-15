export const GetPlayerInfoQuery = (steamId: number) => `
  {
    player(steamAccountId: ${steamId}) {
      steamAccount {
        id
        name
        avatar
        seasonRank
      }
      matches(request: {
        take: 10,
        skip: 0
      }) {
        id
        didRadiantWin
        durationSeconds
        startDateTime
        actualRank
        players {
          steamAccountId
          steamAccount {
            name
            avatar
            seasonRank
          }
          isRadiant
          kills
          deaths
          assists
          numDenies
          goldPerMinute
          hero {
            displayName
          }
        }
      }
    }
  }
`;
