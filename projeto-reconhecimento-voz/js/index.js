(function(){

    var btn_buscar = document.querySelector('.btn-buscar');
    var result_buscar = document.querySelector('.mgs-return');

    if(window.SpeechRecognition || window.webkitSpeechRecognition){

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var audioRecognition = new SpeechRecognition();
        const container = document.querySelector('.container')

        btn_buscar.addEventListener('click', function(){
            
        try {
                audioRecognition.start();
                result_buscar.innerHTML = 'Fale mais...Estou a disposição :)'
                
        } catch (error) {
                console.warn("error!", error.message);

           }
        }, false);
        
        audioRecognition.addEventListener('result', evt => {
            var audioTranscription =  evt.results[0][0].transcript;
            result_buscar.innerHTML = audioTranscription;


            switch (audioTranscription.toLowerCase()) {
                case 'clarear':
                        container.classList.remove('escurecer');
                        container.classList.add('clarear');
                
                break;                    
                case 'escurecer':
                        container.classList.remove('clarear');
                        container.classList.add('escurecer');
                    
                break;
                case audioTranscription.match(/background color/) || audioTranscription.match(/cor de fundo/) :
                var resultColor =  audioTranscription.split('background color') 
                || audioTranscription.split('cor de fundo') ;

                container.style.backgroundColor = `${resultColor}`;
        
                    break;
                        
                default:
                    break;
            }
            if(audioTranscription.match(/pesquisar por/) || audioTranscription.match(/buscar por/) ){
                    
                setTimeout(function(){

                    var resultWeb =  audioTranscription.split('pesquisar por') 
                                     || audioTranscription.split('buscar por') ;
                    if(resultWeb[1])
                    {                        
                        document.location = `https://www.google.com/search?q=` + resultWeb[1];
                    }
                    else{

                        result_buscar.innerHTML = 'Não entendi, você pode repetir?';
                
                    }
                    console.log("resultWwb:", resultWeb)
                }, 2000)
                
            }

        },false)

        audioRecognition.addEventListener('error', function(evt){
            console.log("error:", evt)
        },false)

        
    }else{
        result_buscar.innerHTML = "Não suporta!"
    }


})();