console.log("Let's get this party started!");

$searchText = $('#searchText');
$searchButton = $('#search');
$deleteButton = $('#delete');
$gifHouse = $('#gitHouse');

$searchButton.on('click', async function(){
    const searchValue = $searchText.val();
    const responseGIF = await axios.get(
      `http://api.giphy.com/v1/gifs/translate?s=${searchValue}&api_key=HDfE4lcliDV4wwnFsn4gBiGUdfFFh4d4`
    );
    console.log(responseGIF);
    $searchText.val('');

    gifURL = responseGIF.data.data.url;
    console.log(gifURL);

    let $GIF = $('<img>', {src: gifURL})
    $gifHouse.append($GIF);
});

$deleteButton.on('click', function(){
    $('img').remove();
})