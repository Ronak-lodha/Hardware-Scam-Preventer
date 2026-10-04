from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ai_pipeline.parser import parse_input
from .ai_pipeline.search import search_official_specs, search_local_market_price
from .ai_pipeline.evaluator import evaluate_laptop

@api_view(['POST'])
def evaluate(request):
    user_input = request.data.get('text', '')
    if not user_input:
        return Response({'error': 'No input provided'}, status=400)
    
    try:
        specs = parse_input(user_input)
        official_specs = search_official_specs(specs['brand'], specs['model'])
        market_price = search_local_market_price(specs['brand'], specs['model'], specs['processor'], specs['ram'], specs['storage'])
        result = evaluate_laptop(specs, official_specs, market_price)
        result['parsed_specs'] = specs
        return Response(result)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
