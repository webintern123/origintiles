export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQData {
  general: FAQ[];
  installation: FAQ[];
  maintenance: FAQ[];
  ordering: FAQ[];
  technical: FAQ[];
}

export const faqData: FAQData = {
  general: [
    {
      question: 'What types of tiles do you offer?',
      answer: 'We offer a wide range of ceramic tiles for walls and floors, including designs for bathrooms, kitchens, living spaces, outdoor areas, and commercial use.'
    },
    {
      question: 'How can I choose the right tile for my space?',
      answer: 'Start by considering where the tile will be used, how much foot traffic the area gets, and the look you prefer. You can also use our Tile Quiz or Visualizer to make selection easier.'
    },
    {
      question: 'Do you provide design consultation?',
      answer: 'Yes, our team can guide you on tile selection, finishes, and layout ideas based on your space and needs.'
    },
    {
      question: 'Can I request tile samples before buying?',
      answer: 'Yes, you can request samples to check the colour, finish, and quality before placing an order.'
    }
  ],
  installation: [
    {
      question: 'Do you provide tile installation services?',
      answer: 'We do not install tiles directly, but we can guide you and help you connect with experienced installers.'
    },
    {
      question: 'How do I calculate the number of tiles needed?',
      answer: 'You can use our Tile Calculator to estimate the required quantity. It includes wastage for cutting and fitting.'
    },
    {
      question: 'How long does tile installation usually take?',
      answer: 'Installation time depends on room size, layout, and tile type. Most residential areas take a few days from preparation to completion.'
    },
    {
      question: 'Can tiles be installed over existing flooring?',
      answer: 'In many cases, the surface is level and properly prepared. Your installer can confirm this on site.'
    }
  ],
  maintenance: [
    {
      question: 'How should ceramic tiles be cleaned?',
      answer: 'Regular cleaning with water and a mild cleaner is enough. Avoid harsh chemicals to maintain the tile finish.'
    },
    {
      question: 'Are your tiles stain-resistant?',
      answer: 'Yes, Our tiles are designed to resist common stains when cleaned regularly.'
    },
    {
      question: 'How long do ceramic tiles last?',
      answer: 'With proper installation and care, ceramic tiles can last for many years without losing their appearance.'
    },
    {
      question: 'Can the same tiles be used on walls and floors?',
      answer: 'Some tiles are suitable for both walls and floors. Always check the product recommendation before selecting.'
    }
  ],
  ordering: [
    {
      question: 'Is there a minimum order quantity?',
      answer: 'Minimum order quantity depends on the product. Our team can help you with details based on your requirement.'
    },
    {
      question: 'How long does delivery take?',
      answer: ' Delivery timelines depend on location and order size. Our team will share an estimated delivery time when you place the order.'
    },
    {
      question: 'Do you offer discounts for bulk orders?',
      answer: ' Yes, Special pricing is available for large projects and bulk requirements.'
    },
    {
      question: 'What is your return or exchange policy?',
      answer: 'Returns and exchanges are subject to product condition and order type. Please contact our support team for assistance.'
    },
    {
      question: 'Do you deliver outside India?',
      answer: 'Yes, We support export orders. Our team can guide you through availability and shipping details.'
    }
  ],
  technical: [
    {
      question: 'What’s the difference between ceramic and porcelain tiles?',
      answer: 'Porcelain tiles are denser and more water-resistant, making them suitable for heavy-use areas. Ceramic tiles are ideal for most indoor applications.'
    },
    {
      question: 'What does PEI rating mean?',
      answer: ' PEI rating indicates how well a tile can handle wear and foot traffic.'
    },
    {
      question: 'Are your tiles slip-resistant?',
      answer: ' Yes, We offer tiles with slip-resistant finishes for bathrooms, outdoor areas, and high-safety zones.'
    },
    {
      question: 'What tile size should I choose?',
      answer: ' Tile size depends on room size, layout, and design preference. Larger tiles suit open spaces, while smaller tiles work well in compact areas.'
    }
  ]
};
