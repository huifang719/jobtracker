function SavedJob(loggedInEmail) {
  const getSavedJobList = ()  => {
    fetch('/api/save')
      .then(res => res.json())
      .then(res => console.log(res))
  }

  // return (

  // )
}

export default SavedJob