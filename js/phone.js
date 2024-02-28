const loadPhone = async (searchText ="13", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
}


//Display phone function

const displayPhone = (phones,isShowAll) => {
    //Step1: Get the position where you want to set the element.
    const phoneContainer = document.getElementById('phone-container');

    //Clear phone container before adding new cards:
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    //All button show if there are more than 10 phones
    if(phones.length >12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    console.log("Is showall is clicked?",isShowAll);
    //display only first 10 phones
    if(!isShowAll){
        phones = phones.slice(0,10);
    }

    phones.forEach(phones => {
        console.log(phones)
        //Step:2 Create dive.
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl`;
        //Step:3 set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phones.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phones.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick ="handleShowDetails('${phones.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        //Step:4 append Child
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

//Handle showDetails:

const handleShowDetails = async (id) =>{
    console.log("Click", id)
    //Getting single phone data:
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneInformation(phone);
    
}

//Show phone information
const showPhoneInformation = (phone) =>{
    console.log(phone);

    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span>Storage:</span>${phone.mainFeatures.storage}</p> 
    <p><span>Display:</span>${phone.mainFeatures.displaySize}</p> 
    <p><span>ChipSet:</span>${phone.mainFeatures.chipSet}</p> 
    <p><span>Memory:</span>${phone.mainFeatures.memory}</p> 
    <p><span>Released: </span>${phone.releaseDate}</p> 
    <p><span>GPS: </span>${phone?.others?.GPS ? phone.others.GPS : 'No GPS Available in this device'}</p> 
    <p><span>Brand: </span>${phone.slug}</p> 


    `
    //Show the modal
    show_details_modal.showModal();
}


//Handle search button:

const searchBtn = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText,isShowAll);
   
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// Handle show all:

const handleShowAll = () =>{
    searchBtn(true);
}

loadPhone()



