if exists(select * from sys.procedures where name = 'insAddress')
begin
	drop proc insAddress;
end
go

create proc insAddress
	@line1 varchar(255),
	@line2 varchar(255),
	@city varchar(255 ),
	@state varchar(255),
	@zip varchar(255)
as 
	set nocount on;

	insert into address ( 
			line1,
			line2,
			city,
			state, 
			zip
	)
	values (		
			@line1,
			@line2,
			@city,
			@state, 
			@zip
		);

	return 0;

go