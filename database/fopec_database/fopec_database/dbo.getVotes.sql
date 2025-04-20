if exists( select name from sys.procedures where name = 'getVotes')
begin
	drop proc getVotes
end
go

create proc getVotes

as 
	set nocount on;
		
	select		voter_id,
				voter_username,
				observer_id,
				observer_username,
				vote_type,
				vote_created,
				vote_updated,
				company_name,
				comany_name,
				parent_id,
				parent_name,
				notes

	from		vVotes	
	;
		
go

