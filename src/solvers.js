/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n, start) {
  var theBoard = new Board({n:n});
	var allowedColIndices = _.range(n);
	var putPieces = function(rowIndex, allowedColIndices){
		if (rowIndex===n-1 && allowedColIndices.length > 0){
			theBoard.togglePiece(rowIndex, allowedColIndices[0]);
			return true;
		}
		else{
			for (var i = 0; i < allowedColIndices.length; i++){
				
				theBoard.togglePiece(rowIndex, allowedColIndices[i]);
				allowedColIndices.splice(allowedColIndices.indexOf(allowedColIndices[i]),1);
				if(putPieces(rowIndex+1, allowedColIndices)){
          var output = theBoard.rows();
					return output;
				};
			}
			return false;
		}
	}
	putPieces(0, allowedColIndices);
  solution = theBoard.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var theBoard = new Board({n:n});
  var allowedColIndices = _.range(n);
  var solutionCount = 0;

  var putPieces = function(rowIndex, allowedColIndices){
   
    for (var i = 0; i < allowedColIndices.length; i++){
  //    theBoard.togglePiece(rowIndex, allowedColIndices[i]);
      allowedColIndicesCopy = allowedColIndices.slice();
      
      allowedColIndicesCopy.splice(allowedColIndices.indexOf(allowedColIndices[i]),1);

      putPieces(rowIndex+1, allowedColIndicesCopy);
      if (rowIndex === n -1 ){

        solutionCount++;
      }  
    
    }
    return "finished one branch of the tree";
  }

  putPieces(0, allowedColIndices);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var theBoard = new Board({n:n});
  var solution; 

  var putPieces = function(theRow){
    
    if(theRow===n){
      solution = JSON.parse(JSON.stringify(theBoard.rows()));
      return;
    }
      for (var i = 0; i < n; i++){
          theBoard.togglePiece(theRow,i);
          if(!theBoard.hasAnyQueenConflictsOn(theRow,i) ){
            putPieces(theRow+1);
          }
          theBoard.togglePiece(theRow,i);

        }    
      }


  putPieces(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if(solution===undefined){
    solution = new Board({n:n});
    solution = solution.rows();
  }

  return solution;

};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var theBoard = new Board({n:n});
  var solutions = 0; 

  var putPieces = function(theRow){
    
    if(theRow===n){
      solutions++;
      return;
    }
      for (var i = 0; i < n; i++){
          theBoard.togglePiece(theRow,i);
          if(!theBoard.hasAnyQueenConflictsOn(theRow,i) ){
            putPieces(theRow+1);
          }
          theBoard.togglePiece(theRow,i);

        }    
      }


  putPieces(0);

  return solutions;

};
