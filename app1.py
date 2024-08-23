from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as gemini

app = Flask(__name__)
CORS(app)

gemini.configure(api_key="")
model = gemini.GenerativeModel('gemini-1.5-pro')

@app.route('/musicas', methods=['POST'])
def make_receita():
    try:
        dados = request.json
        musica = dados.get('musica')

        if not musica:
            return jsonify({"Erro": "A música não foi fornecida."}), 400

        prompt = f"""
         Crie uma história baseada na letra da música: {musica}.
         A história deve ser formatada em HTML com codificação UTF-8, mas sem incluir a tag <head>.
         Inclua o título da história em uma tag <h1> e use <h2> para os subtítulos.
         No início da história, adicione o tempo estimado de leitura seguido de um ícone de relógio, e o nome do cantor ou banda seguido de um ícone de microfone.
         Certifique-se de que o conteúdo esteja bem estruturado e visualmente agradável, sem incluir o comando ```html.
         No final da história, inclua a frase: "Qualquer semelhança é mera coincidência."
         """

        response = model.generate_content(prompt)
        print(response)
        # Extrai a receita do texto da resposta
        musica = response.text.strip().split('\n')
        return (musica), 200

    except Exception as e:
        return jsonify({"Erro": str(e)}), 300

if __name__ == '__main__':
    app.run(debug=True)
