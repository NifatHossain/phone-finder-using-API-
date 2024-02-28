const loadPhone = async(brand, isShowAll) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand}`)
    const data= await response.json()
    showPhone(data.data, isShowAll);
}
function searchClicked(isShowAll){
    showLoadingEffect();
    const inpValue= document.getElementById('inpText').value;
    // if(isShowAll)
    loadPhone(inpValue, isShowAll);

}

function showPhone(phones, isShowAll){
    const phoneContainer= document.getElementById('phoneContainer');
    phoneContainer.textContent='';
    if(!isShowAll){
        if(phones.length>12){
            phones= phones.slice(0,12);
            const btn= document.getElementById('showMoreBtn');
            btn.classList.replace('hidden', 'block')
        }
        else{
            const btn= document.getElementById('showMoreBtn');
            if(!btn.classList.contains('hidden')){
                btn.classList.add('hidden')
            }
        }
    }
    else{
        const btn= document.getElementById('showMoreBtn');
        if(!btn.classList.contains('hidden')){
            btn.classList.add('hidden')
        }
    }
    for(const phone of phones){
        const phoneCard= document.createElement('div');
        phoneCard.classList='card w-96 bg-blue-50 shadow-xl mx-4';
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" class="mt-6" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick=" showDetailsData('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    }
    hideLoadingEffect();
}

const showMoreClicked= () =>{
    searchClicked(true);
}

function showLoadingEffect(){
    const loading= document.getElementById('loading');
    loading.classList.remove('hidden');
}

function hideLoadingEffect(){
    const loading= document.getElementById('loading');
    loading.classList.add('hidden');
}

const showDetailsData= async(id) =>{
    const response= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    showModal(data.data)

} 
const showModal=(phone)=>{
    my_modal_5.showModal();
    const phoneInfo= document.getElementById('phoneInfo');
    phoneInfo.textContent='';
    const info= document.createElement('div');
    info.innerHTML= `
    <div class="flex justify-center">
        <img src="${phone.image}" alt="">
    </div>
    <h3 class="font-bold text-lg">${phone.name}</h3>
    <p><b>Brand: </b>${phone?.brand || 'Not Defined'}</p>
    <p><b>Memory: </b>${phone?.mainFeatures?.memory || 'Not Defined'}</p>
    <p><b>Screen: </b>${phone?.mainFeatures?.displaySize || 'Not Defined'}</p>
    
    `;
    phoneInfo.appendChild(info);
}